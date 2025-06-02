export interface DiscordData {
  title?: string;
  color?: number;
  fields?: Record<string, any>;
  [key: string]: any;
}

export interface NotionProperties {
  [key: string]: any;
}

export interface NotionBlock {
  object: string;
  type: string;
  [key: string]: any;
}

export interface NotionResponse {
  [key: string]: any;
}

// discord
export async function sendToDiscord(data: DiscordData): Promise<void> {
  const fieldsData = data.fields || Object.fromEntries(
    Object.entries(data).filter(([key]) => !['title', 'color'].includes(key))
  );

  const payload = {
    embeds: [
      {
        title: data.title || "Bug report",
        color: data.color || 0xff0000,
        fields: Object.entries(fieldsData).map(([key, value]) => ({
          name: key,
          value: String(value),
          inline: true
        }))
      }
    ]
  };

  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Failed to send Discord message: ${error}`);
  }
}

// notion
export class NotionDatabaseManager {
  private token: string;
  private baseUrl: string = "https://api.notion.com/v1";
  private headers: Record<string, string>;

  constructor(token?: string, notionVersion: string = "2022-06-28") {
    this.token = token || process.env.NOTION_API_INTEGRATION_ID!;
    this.headers = {
      "Authorization": `Bearer ${this.token}`,
      "Content-Type": "application/json",
      "Notion-Version": notionVersion
    };
  }

  async addItem(
    databaseId: string, 
    properties: NotionProperties, 
    children?: NotionBlock[]
  ): Promise<NotionResponse> {
    const url = `${this.baseUrl}/pages`;
    
    const payload = {
      parent: { database_id: databaseId },
      properties,
      ...(children && { children })
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload)
    });
    
    return response.json();
  }
}

const notion = new NotionDatabaseManager();

function createContentBlocks(textContent: string, inputBody: string, maxChunkSize: number = 2000): NotionBlock[] {
  let formattedJson: string;
  
  try {
    const parsedJson = JSON.parse(inputBody);
    formattedJson = JSON.stringify(parsedJson, null, 2);
  } catch {
    formattedJson = inputBody;
  }

  const blocks: NotionBlock[] = [
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [{
          type: "text",
          text: { content: "Input request:" },
          annotations: { color: "blue" }
        }]
      }
    },
    {
      object: "block",
      type: "code",
      code: {
        language: "json",
        rich_text: [{
          type: "text",
          text: { content: `URL: "${process.env.SERVER_ADDRESS}"\n${formattedJson}` }
        }]
      }
    },
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [{
          type: "text",
          text: { content: "Error Traceback:" },
          annotations: { color: "red" }
        }]
      }
    }
  ];
  
  // Split long content into chunks
  for (let i = 0; i < textContent.length; i += maxChunkSize) {
    const chunk = textContent.slice(i, i + maxChunkSize);
    const codeBlock: NotionBlock = {
      object: "block",
      type: "code",
      code: {
        language: "javascript",
        rich_text: [{
          type: "text",
          text: { content: chunk }
        }]
      }
    };
    blocks.push(codeBlock);
  }

  blocks.push({
    object: "block",
    type: "heading_2",
    heading_2: {
      rich_text: [{
        type: "text",
        text: { content: "Solution:" },
        annotations: { color: "green" }
      }]
    }
  });

  return blocks;
}

export async function addItemToNotion(
  name: string,
  endpoint: string,
  description: string,
  inputBody: string
): Promise<NotionResponse> {
  const indiaTimezone = 'Asia/Kolkata';
  const now = new Date().toLocaleString('sv-SE', { timeZone: indiaTimezone }).replace(' ', 'T');

  const properties: NotionProperties = {
    "Error": {
      title: [{
        type: "text",
        text: {
          content: name
        }
      }]
    },
    "Date": {
      date: {
        start: now
      }
    },
    "Status": {
      status: {
        name: "Pending"
      }
    },
    "Type": {
      select: {
        name: "frontend"
      }
    },
    "API": {
      url: endpoint
    }
  };

  const childrenBlocks = createContentBlocks(description, inputBody);

  return notion.addItem(process.env.NOTION_DATABASE_ID!, properties, childrenBlocks);
}

export async function saveError(
  name: string,
  endpoint: string,
  description: string,
  inputBody: string
): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    try {
      await addItemToNotion(name, endpoint, description, inputBody);
    } catch (error) {
      console.error(`Failed to log error to Notion: ${error}`);
    }

    try {
      const data = {
        api_endpoint: endpoint,
        error_name: name,
        error_description: description.slice(0, 100)
      };
      await sendToDiscord(data);
    } catch (error) {
      console.error(`Failed to send error to Discord: ${error}`);
    }
  }
} 