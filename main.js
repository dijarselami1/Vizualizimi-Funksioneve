const equationInput = document.getElementById('equation')
const drawBtn       = document.getElementById('drawBtn')
const outputDiv     = document.getElementById('output')

const m = math.create(math.all)

drawBtn.addEventListener('click', () => {
  let equation = equationInput.value // TASK check for undefined
  
  let scope = {
    x: 1, // TASK input x here somehow (1 is hardcoded value for test)
  }

  let result = m.evaluate(equation, scope)

  outputDiv.innerText = result
  outputDiv.classList.remove('hidden')
})