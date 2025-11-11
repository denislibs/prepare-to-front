import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                overflowX: 'auto',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border)'
              }}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code style={{
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--accent)',
                border: '1px solid var(--border)',
                fontFamily: 'Consolas, Monaco, monospace'
              }}
                    {...props}>
                {children}
              </code>
            );
          },
          a({ node, href, children, ...props }: any) {
            return (
              <a
                href={href}
                className="markdown-content__link"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

