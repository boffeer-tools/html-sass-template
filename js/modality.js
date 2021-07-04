// logErrors: parametr
// Протяни пропсы как в реакте, чтобы на любом уровне вложенности ты имел одинаковые исходные данные



function showPop($popWrap, $pop, $onOpen = null) {
	$popWrap.classList.add('pop-wrapper--opened');
	$pop.classList.add('pop--opened');
	document.querySelector('html').classList.add('pop-opened--html');
	if ($onOpen != null) {
		$onOpen();
	}
}



function closePop($popWrap, $pop, $onClose = null) {
	$pop.classList.remove('pop--opened');
	$popWrap.classList.remove('pop-wrapper--opened')
	document.querySelector('html').classList.remove('pop-opened--html')
	if ($onClose != null) {
		$onClose();
	}
}

function closePopByOutsideClick($) {
	// console.log('click outside init')
	document.querySelector($.popWrap).addEventListener('click', function(event) {

		/* Normally - event.tagert.class[0] on click outside the pop === 'pop-aligner'
		 */
		if (event.target.classList[0] === 'pop-aligner') {
			let popWrap = document.querySelector($.popWrap);
			let pop = document.querySelector($.pop);
			let onClose = $.onClose;
			closePop(popWrap, pop, onClose);
		}
	})
}



function popToggle($popWrap, $pop, $onOpen, $onClose){
	let popWrap = $popWrap;
	let	isPopHidden = window.getComputedStyle(popWrap).getPropertyValue('visibility') == 'hidden';
	let pop = $pop;
	isPopHidden
		? showPop(popWrap, pop, $onOpen)
		: closePop(popWrap, pop, $onClose)

	// let form_status = opener.getAttribute('data-form-name');
	// if (form_status != null){
	//   let form_name_val = popWrap.querySelector('form input[name="arit_formname"]').getAttribute('value');
	//   popWrap.querySelector('form input[name="arit_formname"]').value = `form_name_val ${form_status}`
	// }


	// console.log($popWrap, $pop, 'toggled')
}



function popaAddClasses($popWrap, $pop) {
	if ($popWrap != null || $popWrap != undefined) {
		(!$popWrap.classList.contains('pop-wrapper')) ? $popWrap.classList.add('pop-wrapper') : false ;
	}
	if ($pop != null || $pop != undefined) {
		(!$pop.classList.contains('pop')) ? $pop.classList.add('pop') : false ;
	}
		
}



function createPopStructure($) {

	/* === Create main wrapper === */
	let jsPopWrapper = document.createElement('div');
	jsPopWrapper;
	jsPopWrapper.classList.add($.popWrap.replace('.', ''));
	jsPopWrapper.classList.add('pop-wrapper');
	document.querySelector('body').appendChild(jsPopWrapper);
	// console.log('Wrapper created');

	let jsPopAlingner = document.createElement('div');
	jsPopAlingner;
	jsPopAlingner.classList.add('pop-aligner');
	jsPopWrapper.appendChild(jsPopAlingner);
	// console.log('Alginer created');
	/* === /Create main wrapper === */


	let jsPopCloser = document.createElement('button');
	let closerCounter = 0;
	jsPopCloser;
	jsPopCloser.innerText = '×';
	jsPopCloser.setAttribute('type', 'button');

	if ($.popCloser != undefined) {
		jsPopCloser.classList.add($.popCloser.replace('.', ''));
	}
	jsPopCloser.classList.add('pop-closer');
	


	let pop = document.querySelector($.pop)
	jsPopAlingner.appendChild(pop);
	// console.log('Now pop inside aligner');
	pop.classList.add('pop');
	// console.log('pop created');
	
	/* === inner closer ====  */
	if ( $.popCloserType === 'inner' ) {
		jsPopCloser.classList.add('pop-closer--inner');
		pop.appendChild(jsPopCloser)
		closerCounter = 1;
	}

	/* === outer closer ====  */
	if ( $.popCloserType === 'outer')  {
		jsPopCloser.classList.add('pop-closer--outer');
		pop.appendChild(jsPopCloser)
		closerCounter = 1;
	}
	
	/* === corner close button === */
	if (closerCounter == 0) {
		jsPopAlingner.appendChild(jsPopCloser);
		jsPopCloser.classList.add('pop-closer--corner');
	}
	// console.log('Closer created');
}

function modality($){
	// let opener = [...document.querySelectorAll(data.clickTrigger)];
	// let closer = [...document.querySelectorAll(data.popCloser)];
	let popaData = $;
	$.popWrap = $.pop + '-wrapper';

	createPopStructure(popaData);

	// let popWrap = document.querySelector( $.popWrap );
	let popWrap = document.querySelector( $.pop + '-wrapper' );
	let pop = document.querySelector( $.pop );

	if ($.clickTrigger == 'page-leaving') {
		// while(true) {
		//     if (window.onbeforeunload != null) {
		//         window.onbeforeunload = null;
		//     }
		// }
		//
		//
		//
		// TODO: 
		// Сделай параметр для счета количества открытия попапов вместо тру фолс
		//
		let popShown = false;
		document.querySelector('.pop-leaving-area').addEventListener('mouseenter', function() {
			if (popShown === false) {
				showPop(popWrap, pop);
				popShown = true;
				// setTimeout(function(){
				//     popShown = false
				// }, 90000)
			}
		})
		// document.addEventListener('mouseleave', function() {
		//     if (popShown === false) {
		//         showPop(popWrap, pop);
		//         popShown = true;
		//         // setTimeout(function(){
		//         //     popShown = false
		//         // }, 90000)
		//     }
		// })

	} else {
		// let opener = document.querySelector($.clickTrigger);
		const opener = [...document.querySelectorAll($.clickTrigger)];
		opener.map(trigger => {
			trigger.addEventListener("click", function() { popToggle(popWrap, pop, $.onOpen, $.onClose);

			})
		// opener.addEventListener("click", function() { popToggle(popWrap, pop, $.onOpen, $.onClose);
		});
	}

	let closer;
	if (closer == undefined) {
		closer = popWrap.querySelector('.pop-closer')
	} else {
		closer = popWrap.querySelector( $.popCloser );
	}

	// popaAddClasses(popWrap, pop)
	
	popWrap.removeAttribute('hidden');
	
	closer.addEventListener('click', function() {closePop(popWrap, pop, $.onClose)});
	closePopByOutsideClick(popaData);

	// opener.map(mapped => mapped.addEventListener("click", () => popToggle(data.popWrap, data.pop)));
	// closer.map(mapped => mapped.addEventListener('click', () => closePop(data.popWrap, data.pop)));
}


// popa({
// 	pop: '.pop-class',
// 	// clickTrigger: '.pop-trigger--class',
// 	// popCloser: '.closer-class',
// 	popCloserType: 'inner',
// 	// popCloserType: 'outer',
// })