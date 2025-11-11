export interface Topic {
  id: string;
  name: string;
  file: string;
  icon?: string;
}

export const topics: Topic[] = [
  { id: 'web', name: 'Web Technologies', file: 'web.md', icon: 'WWW.png' },
  { id: 'security', name: 'Security', file: 'security.md', icon: 'Security.png' },
  { id: 'oop-fp', name: 'OOP & FP', file: 'oop-fp.md', icon: 'Dev.png' },
  { id: 'html', name: 'HTML', file: 'html.md', icon: 'HTML.png' },
  { id: 'css', name: 'CSS', file: 'css.md', icon: 'CSS.png' },
  { id: 'js', name: 'JavaScript', file: 'js.md', icon: 'JavaScript.png' },
  { id: 'browser-js', name: 'JS in Browser', file: 'browser-js.md', icon: 'JSDom.png' },
  { id: 'async-js', name: 'Async JS', file: 'async-js.md', icon: 'JavaScript.png' },
  { id: 'es', name: 'ECMAScript', file: 'es.md', icon: 'ES6.jpg' },
  { id: 'accessibility', name: 'Accessibility', file: 'accessibility.md', icon: 'Accessibility.png' },
  { id: 'performance', name: 'Performance', file: 'performance.md', icon: 'performance.png' },
  { id: 'ts', name: 'TypeScript', file: 'ts.md', icon: 'TypeScript.png' },
  { id: 'react', name: 'React', file: 'react.md', icon: 'React.png' },
  { id: 'vue-js', name: 'Vue.js', file: 'vue-js.md', icon: 'Vue.png' },
  { id: 'angular', name: 'Angular', file: 'angular.md', icon: 'Angular.png' },
  { id: 'state-management', name: 'State Management', file: 'state-management.md', icon: 'Redux.png' },
  { id: 'node-js', name: 'Node.js', file: 'node-js.md', icon: 'Node.png' },
  { id: 'testing', name: 'Testing', file: 'testing.md', icon: 'Testing_Library.png' },
  { id: 'tools', name: 'Tools', file: 'tools.md', icon: 'Tools.png' },
  { id: 'soft-skills', name: 'Soft Skills', file: 'soft-skills.md', icon: 'Soft-skills.png' },
  { id: 'practical-tasks', name: 'Практические задачи', file: 'practical-tasks.md', icon: 'Dev.png' },
];

export function getTopicById(id: string): Topic | undefined {
  return topics.find(topic => topic.id === id);
}

export function getTopicByFile(file: string): Topic | undefined {
  return topics.find(topic => topic.file === file);
}

