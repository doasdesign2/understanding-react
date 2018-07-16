class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      definedLimit: 2500,
      maxLimit: 5000,
      header: [
        {
          tagName: 'h2',
          class: 'hello',
          textContent: 'testando222'
        },
        {
          tagName: 'h1',
          textContent: 'Ajuste de limite'
        }
      ],
      header2: [
        {
          tagName: 'h1',
          textContent: 'Ajuste de limite'
        },
        {
          tagName: 'h2',
          textContent: 'ajustando2'
        }
      ],
      label: ''
    };
  }

  setDefinedLimit(e) {
    this.setState(() => ({
      definedLimit: parseInt(e.target.value)
    }))
  }

  changeHeader () {
    this.setState({
      header: [
        {
          tagName: 'h1',
          class: 'style1',
          textContent: 'Ajuste de limite'
        }
      ],
      header2: [
        {
          tagName: 'h2',
          class: 'style2',
          textContent: `${this.state.label}foo`
        }
      ],
      label: 'sample text'
    })
  }

  render() {
    return node({
      tagName: 'div',
      children: [
        ...this.state.header
        , {
          tagName: 'input',
          type: 'text',
          value: this.state.definedLimit,
          onchange: e => this.setDefinedLimit(e)
        }, {
          tagName: 'p',
          textContent: `R$ ${ this.state.maxLimit - this.state.definedLimit } disponíveis`
        }, {
          tagName: 'input',
          type: 'range',
          min: 0,
          max: this.state.maxLimit,
          value: this.state.definedLimit,
          onchange: e => this.setDefinedLimit(e)
        }, {
          tagName: 'div',
          children: [
            {
              tagName: 'figure',
              children: [
                ...this.state.header2,
                {
                  tagName: 'p',
                  textContent: this.state.label
                }
              ]
            }
          ]
        }, {
          tagName: 'button',
          textContent: 'Click',
          onclick: () => this.changeHeader()
        },
        ...this.state.header2
      ],
    });
  }
}
