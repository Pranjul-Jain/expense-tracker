export const addErrorMessage = (elementId,errorMessage,className)=>{

    const element = document.getElementById(elementId)
    let errorDiv = element.parentElement.parentElement.nextElementSibling

    if(errorDiv && errorDiv.classList.contains(className)){
      
        errorDiv.innerHTML = errorMessage
        errorDiv.classList.contains("hidden") && errorDiv.classList.remove("hidden")
    }else{
        let errorElement = document.createElement("div")
        errorElement.classList.add(className);
        errorElement.innerHTML = errorMessage

        element.parentElement.parentElement.insertAdjacentElement("beforeend",errorDiv)
    }

}