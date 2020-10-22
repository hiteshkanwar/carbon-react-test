


let reverseArray = []
const recursive = (array) => {
	if (array.length !== 0)
	{
      reverseArray.push(array.pop())
       recursive(array)
	}
   
}

recursive([1,2,3,4])