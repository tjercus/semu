import { ViewModel } from "./types.ts";

/**
 * Poor man's templating using string interpolation
 */
export const makeView = (model: ViewModel): string => {
  return `
  <html lang="en">
    <title>SEMU</title>
    <style>
      body { font-family: Ubuntu, sans-serif; }
      body p { font-size: 2em; }
      #main { margin: 1em; padding: 1em; background-color: ${
    model.isSelling ? "lightgreen" : "red"
  }; }
    </style>
    <body>
      <article id="main">
        <h1>${model.userId}, current power status (${model.date})</h1>
        <p>Producing: <strong>${model.actualProduced}</strong>, consuming: <strong>${model.actualConsumed}</strong> kWh</p>
        <p>Selling? <strong>${model.isSelling}</strong></p>
      </article>
     </body>
  </html>
  `;
};
