# Diffy View

 A simple class to extend and make React like components for CLI

### Example

``` js
const DiffyView = require("diffy-view")

class View extends DiffyView {
  render(){
    return `Enter your name
      ${this.state.name || ""}
    `
  }
}

const view = new View({state:{}})

view.on("enter-key",()=>{
 console.log("Enter key pressed")
  view.setState({
    name : this.state.input
  })
})

view.on("update",(line)=>{
  view.setState({
    input:line
  }) 
})

view.forceRender()
```

## Credit
[Diffy](https://github.com/mafintosh/diffy) by [Mafintosh](https://github.com/mafintosh)
