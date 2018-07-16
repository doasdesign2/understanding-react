class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      definedLimit: 2500,
      maxLimit: 5000,
    };
  }

  setDefinedLimit(e) {
    this.setState(() => ({
      definedLimit: parseInt(e.target.value)
    }))
  }

  render() {
    return node({
      tagName: 'div',
      class: 'limit-manager',
      children: [
        {
          tagName: 'h1',
          class: 'limit-manager__header-title',
          textContent: 'Ajuste de limite'
        },
        {
          tagName: 'div',
          class: 'limit-manager__limit-amount-wrapper',
          children: [
            {
              tagName: 'span',
              class: 'limit-manager__limit-amount-placeholder',
              textContent: 'R$'
            },
            {
              tagName: 'input',
              class: 'limit-manager__limit-amount',
              type: 'text',
              min: 0,
              max: this.state.maxLimit,
              value: this.state.definedLimit,
              onchange: e => this.setDefinedLimit(e)
            },
            {
              tagName: 'span',
              class: 'limit-manager__limit-amount-placeholder',
              textContent: ',00'
            }
          ]
        },
        {
          tagName: 'p',
          class: 'limit-manager__available-limit-placeholders',
          children: [
            {
              textContent: 'R$ '
            },
            {
              tagName: 'b',
              textContent: this.state.maxLimit - this.state.definedLimit
            },
            {
              textContent: ',00 disponível'
            }
          ]
        },
        {
          tagName: 'input',
          class: 'limit-manager__limit-slider',
          type: 'range',
          min: 0,
          max: this.state.maxLimit,
          value: this.state.definedLimit,
          onchange: e => this.setDefinedLimit(e)
        },
        {
          tagName: 'div',
          class: 'limit-manager__limit-slider-labels',
          children: [
            {
              tagName: 'span',
              class: 'limit-manager__limit-slider-labels-min',
              textContent: 0
            },
            {
              tagName: 'span',
              class: 'limit-manager__limit-slider-labels-max',
              textContent: this.state.maxLimit
            }
          ]
        },
        {
          tagName: 'button',
          class: 'limit-manager__save-button',
          textContent: 'Salvar',
          type: 'submit'
        }
      ],
    });
  }
}
