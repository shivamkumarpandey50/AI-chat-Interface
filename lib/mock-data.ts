import { Chat, AIModel, PromptTemplate, Message } from '@/types/chat';

export const mockModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Most capable GPT model, best for complex reasoning',
    maxTokens: 8192,
    provider: 'OpenAI'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient, great for most tasks',
    maxTokens: 4096,
    provider: 'OpenAI'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    description: 'Anthropic\'s most powerful model for complex tasks',
    maxTokens: 4096,
    provider: 'Anthropic'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Google\'s advanced AI model with multimodal capabilities',
    maxTokens: 2048,
    provider: 'Google'
  },
  {
    id: 'custom',
    name: 'Custom Model',
    description: 'Configure your own model endpoint',
    maxTokens: 4096,
    provider: 'Custom'
  }
];

export const mockTemplates: PromptTemplate[] = [
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    description: 'For storytelling and creative content',
    content: 'You are a creative writing assistant. Help me write engaging, imaginative content with vivid descriptions and compelling narratives. Focus on:\n\n- Rich character development\n- Immersive world-building\n- Engaging dialogue\n- Show, don\'t tell principle\n\nPlease assist with:',
    category: 'Creative'
  },
  {
    id: 'code-review',
    name: 'Code Review',
    description: 'For analyzing and improving code',
    content: 'You are an experienced senior developer conducting a thorough code review. Please analyze the following code for:\n\n- Code quality and best practices\n- Performance optimizations\n- Security vulnerabilities\n- Maintainability improvements\n- Documentation gaps\n\nProvide specific, actionable feedback:\n\n',
    category: 'Development'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'For interpreting data and statistics',
    content: 'You are a data analyst expert. Help me analyze and interpret data by:\n\n- Identifying key patterns and trends\n- Providing statistical insights\n- Suggesting visualizations\n- Explaining correlations and causations\n- Recommending next steps\n\nData to analyze:\n\n',
    category: 'Analytics'
  },
  {
    id: 'technical-writing',
    name: 'Technical Writing',
    description: 'For documentation and technical content',
    content: 'You are a technical writing specialist. Help me create clear, comprehensive documentation that:\n\n- Explains complex concepts simply\n- Follows proper structure and formatting\n- Includes practical examples\n- Addresses common questions\n- Maintains consistency\n\nTopic to document:\n\n',
    category: 'Documentation'
  },
  {
    id: 'brainstorming',
    name: 'Brainstorming',
    description: 'For generating ideas and solutions',
    content: 'You are a creative brainstorming partner. Help me generate innovative ideas by:\n\n- Thinking outside the box\n- Building on concepts iteratively\n- Exploring multiple perspectives\n- Combining different approaches\n- Prioritizing feasibility\n\nLet\'s brainstorm about:\n\n',
    category: 'Creative'
  }
];

const sampleMessages1: Message[] = [
  {
    id: '1',
    content: 'Can you explain the concept of machine learning in simple terms?',
    role: 'user',
    timestamp: new Date('2024-01-15T14:30:00.000Z')
  },
  {
    id: '2',
    content: 'Machine learning is like teaching a computer to recognize patterns and make predictions based on examples, similar to how humans learn from experience. \n\nImagine showing a child thousands of photos labeled "cat" or "dog." Eventually, they learn to identify cats and dogs in new photos. Machine learning works similarly - we show computers lots of data with known answers, and they learn to make predictions on new, unseen data.\n\nThe three main types are:\n- **Supervised learning**: Learning with labeled examples\n- **Unsupervised learning**: Finding patterns in unlabeled data\n- **Reinforcement learning**: Learning through trial and error with rewards',
    role: 'assistant',
    timestamp: new Date('2024-01-15T14:30:20.000Z'),
    model: 'gpt-4'
  },
  {
    id: '3',
    content: 'That\'s a great explanation! Can you give me a practical example of each type?',
    role: 'user',
    timestamp: new Date('2024-01-15T14:31:20.000Z')
  },
  {
    id: '4',
    content: 'Absolutely! Here are practical examples:\n\n**Supervised Learning:**\n- Email spam detection: Train on thousands of emails labeled "spam" or "not spam"\n- Medical diagnosis: Use X-rays with known diagnoses to identify diseases\n- Price prediction: Use house features (size, location) with sale prices to predict new home values\n\n**Unsupervised Learning:**\n- Customer segmentation: Group customers by shopping behavior without predefined categories\n- Data compression: Find patterns to reduce file sizes\n- Anomaly detection: Identify unusual network traffic that might indicate security threats\n\n**Reinforcement Learning:**\n- Game AI: AlphaGo learning chess by playing millions of games\n- Autonomous vehicles: Learning to drive by trial and error in simulations\n- Recommendation systems: Learning what content keeps users engaged',
    role: 'assistant',
    timestamp: new Date('2024-01-15T14:31:40.000Z'),
    model: 'gpt-4'
  }
];

const sampleMessages2: Message[] = [
  {
    id: '5',
    content: 'Help me write a Python function to calculate fibonacci numbers',
    role: 'user',
    timestamp: new Date('2024-01-15T12:30:00.000Z')
  },
  {
    id: '6',
    content: 'Here\'s an efficient Python function to calculate Fibonacci numbers with multiple approaches:\n\n```python\ndef fibonacci_iterative(n):\n    """Calculate nth Fibonacci number iteratively (most efficient)"""\n    if n <= 1:\n        return n\n    \n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\ndef fibonacci_memoized(n, memo={}):\n    """Calculate nth Fibonacci number with memoization"""\n    if n in memo:\n        return memo[n]\n    if n <= 1:\n        return n\n    \n    memo[n] = fibonacci_memoized(n-1, memo) + fibonacci_memoized(n-2, memo)\n    return memo[n]\n\n# Usage examples\nprint(fibonacci_iterative(10))  # Output: 55\nprint(fibonacci_memoized(10))   # Output: 55\n```\n\nThe iterative version is most efficient for single calculations, while the memoized version is better when calculating multiple Fibonacci numbers.',
    role: 'assistant',
    timestamp: new Date('2024-01-15T12:30:20.000Z'),
    model: 'gpt-3.5-turbo'
  }
];

const sampleMessages3: Message[] = [
  {
    id: '7',
    content: 'What are the best practices for designing a REST API?',
    role: 'user',
    timestamp: new Date('2024-01-15T11:30:00.000Z')
  },
  {
    id: '8',
    content: 'Here are the key best practices for designing REST APIs:\n\n## 1. Resource-Based URLs\n- Use nouns, not verbs: `/users` not `/getUsers`\n- Use plural nouns: `/users/123` not `/user/123`\n- Nest resources logically: `/users/123/posts`\n\n## 2. HTTP Methods\n- **GET**: Retrieve data (idempotent)\n- **POST**: Create new resources\n- **PUT**: Update/replace entire resource\n- **PATCH**: Partial updates\n- **DELETE**: Remove resources\n\n## 3. Status Codes\n- **200**: Success\n- **201**: Created\n- **400**: Bad Request\n- **401**: Unauthorized\n- **404**: Not Found\n- **500**: Internal Server Error\n\n## 4. Response Format\n```json\n{\n  "data": {},\n  "status": "success",\n  "message": "Operation completed",\n  "pagination": {\n    "page": 1,\n    "limit": 20,\n    "total": 100\n  }\n}\n```\n\n## 5. Additional Best Practices\n- Version your API: `/api/v1/users`\n- Implement pagination for large datasets\n- Use HTTPS everywhere\n- Rate limiting and authentication\n- Comprehensive error handling\n- Clear documentation (OpenAPI/Swagger)',
    role: 'assistant',
    timestamp: new Date('2024-01-15T11:30:20.000Z'),
    model: 'claude-3-opus'
  }
];

export const mockChats: Chat[] = [
  {
    id: 'chat-1',
    title: 'Machine Learning Basics',
    messages: sampleMessages1,
    createdAt: new Date('2024-01-15T14:30:00.000Z'),
    updatedAt: new Date('2024-01-15T14:31:40.000Z')
  },
  {
    id: 'chat-2',
    title: 'Python Fibonacci Function',
    messages: sampleMessages2,
    createdAt: new Date('2024-01-15T12:30:00.000Z'),
    updatedAt: new Date('2024-01-15T12:30:20.000Z')
  },
  {
    id: 'chat-3',
    title: 'REST API Best Practices',
    messages: sampleMessages3,
    createdAt: new Date('2024-01-15T11:30:00.000Z'),
    updatedAt: new Date('2024-01-15T11:30:20.000Z')
  }
];

export const defaultParameters = {
  temperature: 0.7,
  maxTokens: 2048,
  topP: 0.9,
  frequencyPenalty: 0.0
};

export const parameterPresets = {
  creative: {
    temperature: 0.9,
    maxTokens: 2048,
    topP: 0.95,
    frequencyPenalty: 0.3
  },
  balanced: {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0.0
  },
  precise: {
    temperature: 0.3,
    maxTokens: 1024,
    topP: 0.8,
    frequencyPenalty: 0.1
  }
};