import { definePlugin } from 'sanity'

export const customStyles = definePlugin({
  name: 'custom-styles',
  studio: {
    components: {
      layout: (props) => {
        // Inject custom styles for Sanity portable text editor
        const style = document.createElement('style')
        style.textContent = `
          /* Target Sanity portable text editor blocks with custom styles */
          [data-testid="pt-editor"] [data-block-style="textSizeSmall"],
          .pt-block[data-style="textSizeSmall"],
          div[data-testid="pt-editor"] span[data-text] {
            font-size: 12px !important;
          }

          [data-testid="pt-editor"] [data-block-style="textSizeMedium"],
          .pt-block[data-style="textSizeMedium"] {
            font-size: 18px !important;
          }

          [data-testid="pt-editor"] [data-block-style="textSizeLarge"],
          .pt-block[data-style="textSizeLarge"] {
            font-size: 24px !important;
          }

          /* More specific selectors for the portable text editor */
          div[data-ui="TextBlock"][data-style="textSizeSmall"] {
            font-size: 12px !important;
          }

          div[data-ui="TextBlock"][data-style="textSizeMedium"] {
            font-size: 18px !important;
          }

          div[data-ui="TextBlock"][data-style="textSizeLarge"] {
            font-size: 24px !important;
          }
        `
        if (!document.head.querySelector('#custom-editor-styles')) {
          style.id = 'custom-editor-styles'
          document.head.appendChild(style)
        }
        return props.renderDefault(props)
      },
    },
  },
})
