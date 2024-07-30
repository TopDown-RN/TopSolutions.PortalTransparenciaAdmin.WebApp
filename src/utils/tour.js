import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'

export function createTour(steps) {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      scrollTo: true,
      when: {
        show: function () {
          const currentStepIndex = tour.steps.indexOf(tour.getCurrentStep()) + 1
          const totalSteps = tour.steps.length
          const stepCounter = document.createElement('span')
          stepCounter.className = 'step-counter'
          stepCounter.innerText = `${currentStepIndex}/${totalSteps}`
          const titleElement = this.el.querySelector('.shepherd-title')
          if (titleElement) {
            titleElement.appendChild(stepCounter)
          }
        }
      }
    }
  })

  steps.forEach((step) => tour.addStep(step))

  return tour
}
