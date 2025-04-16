import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from './App';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  if (!container) throw new Error('Container not found');
  const root = createRoot(container);
  root.render(<App />);
});
