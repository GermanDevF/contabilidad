import path from 'node:path';

export const createTemplateDir = (templateName: string) => {
  const templatePath = path.join(__dirname, 'emails/templates/', templateName);

  return templatePath;
};
