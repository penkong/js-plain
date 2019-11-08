//
import './styles/tooltip.css';
class Tooltip {
  constructor(el) {
    this.el = el;
    this.message = el.getAttribute('data-message');
  }
  init() {
    // tip is bubble of tooltip when we hover
    const tip = document.createElement('div');
    tip.classList.add('tip');
    tip.textContent = this.message;
    this.el.appendChild(tip);
    this.el.addEventListener('mouseenter', () => {
      tip.classList.add('active');
    });
    this.el.addEventListener('mouseleave', () => {
      tip.classList.remove('active');
    });
  }
}

export default Tooltip;
