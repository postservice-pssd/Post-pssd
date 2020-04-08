class Cursor {
  constructor( el, target ) {
    this.el = el
    this.target = target
    this.triggerDistance = 90

    this.bind()
  }

  bind() {
    window.addEventListener( 'mousemove', this.move.bind( this ), false )
  }

  move( e ) {
    const cursorPosition = {
      left: e.clientX,
      top: e.clientY
    }

    const targetPosition = {
      left: this.target.getBoundingClientRect().left + this.target.getBoundingClientRect().width / 2,
      top: this.target.getBoundingClientRect().top + this.target.getBoundingClientRect().height / 2,
    }

    const distance = {
      x: targetPosition.left - cursorPosition.left,
      y: targetPosition.top - cursorPosition.top
    }

    const angle = Math.atan2( distance.x, distance.y )
    const hypotenuse = Math.sqrt( distance.x * distance.x + distance.y * distance.y )

    if( hypotenuse < this.triggerDistance ) {
      this.el.classList.add( 'expanded' )
      this.target.classList.add( 'expanded' )

      TweenMax.to( this.el, 0.3, {
        left: targetPosition.left - Math.sin( angle ) * hypotenuse / 5,
        top: targetPosition.top - Math.cos( angle ) * hypotenuse / 5
      } )
    } else {
      this.el.classList.remove( 'expanded' )
      this.target.classList.remove( 'expanded' )

      TweenMax.to( this.el, 0.3, {
        left: cursorPosition.left,
        top: cursorPosition.top
      } )
    }
  }
}

const element = document.getElementById( 'cursor' )
const target = document.getElementById( 'target' )
const cursor = new Cursor( element, target )
