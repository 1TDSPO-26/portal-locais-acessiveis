export default function IconLogo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#005FCC" />
      <rect x="-1.6" y="-7.5" width="3.2" height="15" rx="1.6" fill="white" transform="translate(12,16) rotate(20)" />
      <rect x="17.3" y="14.6" width="8.4" height="2.8" rx="1.4" fill="white" />
      <rect x="20.1" y="11.8" width="2.8" height="8.4" rx="1.4" fill="white" />
    </svg>
  );
}