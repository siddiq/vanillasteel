import '@material/web/button/filled-button.js'
import '@material/web/button/outlined-button.js'
import '@material/web/checkbox/checkbox.js'
import '@material/web/slider/slider.js'

import './App.css'

function App() {
  return (
    <div className="App">
      hello
      <label>
        Material 3<md-checkbox checked></md-checkbox>
      </label>
      <md-outlined-button>Back</md-outlined-button>
      <md-filled-button>Next</md-filled-button>
      slider here
      <md-slider range value-start="25" value-end="75"></md-slider>
      new slider
    </div>
  )
}

export default App
