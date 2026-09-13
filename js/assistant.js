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

const CHAT_STYLE_ID = 'chatty-launcher-styles';

function injectStyles() {
  if (document.getElementById(CHAT_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = CHAT_STYLE_ID;
  style.textContent = `
    .assistant-launcher {
      position: fixed;
      right: var(--space-l);
      bottom: var(--space-l);
      z-index: 130;
      width: clamp(4.75rem, 8vw, 6.5rem);
      height: clamp(4.75rem, 8vw, 6.5rem);
      padding: 0;
      border: 0;
      border-radius: 50%;
      overflow: visible;
      background: transparent;
      box-shadow: none;
      cursor: pointer;
      animation: chatty-breathe 3.2s ease-in-out infinite;
    }

    .assistant-launcher img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 0.5rem 1.25rem rgb(6 27 63 / 22%));
    }

    .assistant-launcher__status {
      position: absolute;
      right: 6%;
      bottom: 7%;
      width: clamp(0.8rem, 1.5vw, 1rem);
      height: clamp(0.8rem, 1.5vw, 1rem);
      border: 2px solid var(--ivory);
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 0 0 rgb(34 197 94 / 48%);
      animation: chatty-online 2.2s ease-out infinite;
    }

    .assistant-note {
      position: fixed;
      right: var(--space-l);
      bottom: calc(var(--space-l) + clamp(4.9rem, 8vw, 6.7rem));
      z-index: 130;
      max-width: min(20rem, calc(100vw - 2 * var(--space-l)));
      margin: 0;
      padding: var(--space-s) var(--space-m);
      background: var(--blue-deep);
      color: var(--ivory);
      font-size: 0.82rem;
      line-height: var(--leading-normal);
      border: 1px solid rgb(255 255 255 / 12%);
      border-radius: var(--radius-s);
      box-shadow: var(--shadow-m);
    }

    .assistant-launcher:focus-visible {
      outline: 2px solid var(--gold);
      outline-offset: 5px;
    }

    @media (hover: hover) {
      .assistant-launcher:hover {
        animation-play-state: paused;
        transform: translateY(-0.25rem) scale(1.04);
      }
    }

    @keyframes chatty-breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.045); }
    }

    @keyframes chatty-online {
      0% { box-shadow: 0 0 0 0 rgb(34 197 94 / 48%); }
      70% { box-shadow: 0 0 0 0.45rem rgb(34 197 94 / 0%); }
      100% { box-shadow: 0 0 0 0 rgb(34 197 94 / 0%); }
    }

    @media (prefers-reduced-motion: reduce) {
      .assistant-launcher,
      .assistant-launcher__status { animation: none; }
    }

    @media (max-width: 30rem) {
      .assistant-launcher {
        right: var(--space-m);
        bottom: var(--space-m);
      }

      .assistant-note {
        right: var(--space-m);
        bottom: calc(var(--space-m) + 5rem);
      }
    }
  `;

  document.head.appendChild(style);
}

export function initAssistantLauncher() {
  if (document.querySelector('[data-assistant-launcher]')) return;
  if (!assistant || !assistant.image) return;

  injectStyles();

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
  button.setAttribute('aria-label', `Open ${assistant.name}`);
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

  const status = document.createElement('span');
  status.className = 'assistant-launcher__status';
  status.setAttribute('aria-hidden', 'true');
  button.append(status);

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
