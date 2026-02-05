// Sensitive words list (simplified version)
const SENSITIVE_WORDS = [
  '政治敏感词',
  '暴力',
  '色情',
  '赌博',
  '毒品',
  // Add more sensitive words as needed
];

/**
 * Check if content contains sensitive words
 */
export function hasSensitiveWords(content: string): boolean {
  const lowerContent = content.toLowerCase();
  return SENSITIVE_WORDS.some(word => 
    lowerContent.includes(word.toLowerCase())
  );
}

/**
 * Filter sensitive words from content
 * Replace sensitive words with asterisks
 */
export function filterSensitiveWords(content: string): string {
  let filtered = content;
  SENSITIVE_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi');
    filtered = filtered.replace(regex, '*'.repeat(word.length));
  });
  return filtered;
}

/**
 * Validate content length and sensitive words
 */
export function validateContent(content: string, maxLength: number): {
  valid: boolean;
  error?: string;
} {
  if (!content || content.trim().length === 0) {
    return { valid: false, error: '内容不能为空' };
  }
  
  if (content.length > maxLength) {
    return { valid: false, error: `内容不能超过${maxLength}字` };
  }
  
  if (hasSensitiveWords(content)) {
    return { valid: false, error: '内容包含敏感词，请修改后重试' };
  }
  
  return { valid: true };
}
