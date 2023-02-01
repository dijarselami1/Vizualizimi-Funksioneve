const equationInput = document.getElementById('equation')
const drawBtn       = document.getElementById('drawBtn')
const outputDiv     = document.getElementById('output')

const m = math.create(math.all)

drawBtn.addEventListener('click', () => {
  let equation = equationInput.value // TASK #1
  
  let scope = {
    x: 1, // TASK #2 (1 is hardcoded value for test)
  }

  let result = m.evaluate(equation, scope)

  outputDiv.innerText = result
  outputDiv.classList.remove('hidden')
})