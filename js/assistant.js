/* --------------------------------------------------------------- Chatty */

import { assistant } from '../data/images.js';

export function initAssistantLauncher() {
  if (document.querySelector('[data-assistant-launcher]')) return;
  if (!assistant || !assistant.image) return;


  const note = document.createElement('p');
  note.className = 'assistant-note';
  note.id = 'assistant-launcher-note';
  note.setAttribute('role', 'status');
  note.setAttribute('aria-live', 'polite');
  note.textContent = `${assistant.name} is here — questions and enquiries can be sent from the contact page.`;
  note.hidden = true;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'assistant-launcher';
  button.setAttribute('data-assistant-launcher', '');
  button.setAttribute('aria-label', `Show ${assistant.name} help`);
  button.setAttribute('aria-describedby', note.id);
  button.setAttribute('aria-expanded', 'false');

  const img = document.createElement('img');
  img.src = assistant.image;
  img.alt = '';
  img.width = 104;
  img.height = 104;
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
