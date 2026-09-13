/**
 * Floating assistant launcher — the visual home for "Chatty".
 *
 * There is no backend for this yet, so the launcher is honest about that:
 * clicking it reveals a short note instead of pretending to start a chat.
 * When the backend exists, replace the click handler below with whatever
 * opens the real chat surface — the button, image and positioning can all
 * stay as they are.
 *
 * Rendered once, injected at the end of <body> so it floats above every
 * page without needing markup changes on each template.
 */

import { assistant } from '../data/images.js';

export function initAssistantLauncher() {
  if (document.querySelector('[data-assistant-launcher]')) return;
  if (!assistant || !assistant.image) return;

  const note = document.createElement('p');
  note.className = 'assistant-note';
  note.id = 'assistant-launcher-note';
  note.setAttribute('role', 'status');
  note.setAttribute('aria-live', 'polite');
  note.textContent = `${assistant.name} isn't connected yet — send us an enquiry in the meantime.`;
  note.hidden = true;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'assistant-launcher';
  button.setAttribute('data-assistant-launcher', '');
  button.setAttribute('aria-label', `Chat with ${assistant.name} (coming soon)`);
  button.setAttribute('aria-describedby', note.id);
  button.setAttribute('aria-expanded', 'false');

  const img = document.createElement('img');
  img.src = assistant.image;
  img.alt = '';
  img.width = 40;
  img.height = 40;
  img.loading = 'lazy';
  img.decoding = 'async';
  button.append(img);

  button.addEventListener('click', () => {
    note.hidden = !note.hidden;
    button.setAttribute('aria-expanded', String(!note.hidden));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !note.hidden) {
      note.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    }
  });

  document.body.append(button, note);
}
