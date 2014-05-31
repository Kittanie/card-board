function addClass(el, className){
	if (el.classList)
	  el.classList.add(className);
	else
	  el.className += ' ' + className;
}

function createContainerDiv(){
	var container = document.createElement('div')

	container.style.width = '100%'
	container.style.height = '100%'
	addClass(container, 'card-board')

	return container
}

function createPositionDiv(positionConfig){
	var positionDiv = document.createElement('div')

	positionDiv.style.position = 'absolute'
	positionDiv.setAttribute('id', positionConfig.id)
	positionDiv.style.width = positionConfig.width + '%'
	positionDiv.style.height = positionConfig.height + '%'
	positionDiv.style.left = positionConfig.left + '%'
	positionDiv.style.top = positionConfig.top + '%'
	addClass(positionDiv, positionConfig.type)

	return positionDiv
}

function createPositionDivs(config){
	return config.cardPositions.map(function(positionConfig){
		positionConfig.width = config.width
		positionConfig.height = config.height
		return createPositionDiv(positionConfig)
	})
}

function createCardBoard(config){
	var container = createContainerDiv()
	var positionDivs = createPositionDivs(config)

	positionDivs.forEach(function(div){
		container.appendChild(div)
	})

	return container
}

function getPositionById(positions, id){
	var results = positions.filter(function(position){
		return position.id == id
	})
	return results[0] || null
}

module.exports = function(config){
	config = config || {}

	if(!config.width){
		throw new Error('card-board requires a width option')
	}

	if(!config.height){
		throw new Error('card-board requires a height option')
	}

	return {
		render:function(){
			return createCardBoard(config)
		},
		getPositionById:function(id){
			return getPositionById(config.cardPositions, id)
		}
	}
}