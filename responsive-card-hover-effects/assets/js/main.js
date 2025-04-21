/*=============== EXPANDED LIST ===============*/
const navExpand = document.getElementById('nav-expand'),
      navExpandList = document.getElementById('nav-expand-list'),
      navExpandIcon = document.getElementById('nav-expand-icon')

const button = document.getElementById("fuckBtn")
const button1 = document.getElementById("fuckBtn1")
const button2 = document.getElementById("fuckBtn2")
button.addEventListener('click', () => {
	 window.location.href = 'balance.html'
})
button1.addEventListener('click', () => {
	 window.location.href = 'balance.html'
})
button2.addEventListener('click', () => {
	 window.location.href = 'balance.html'
})

navExpand.addEventListener('click', () => {
   // Expand list
   navExpandList.classList.toggle('show-list')

   // Rotate icon
   navExpandIcon.classList.toggle('rotate-icon')
})


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)
