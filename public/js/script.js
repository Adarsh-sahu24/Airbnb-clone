(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// const listingImageInput = document.querySelector('#listing-image-input')
// const listingImagePreview = document.querySelector('#listing-image-preview')

// if (listingImageInput && listingImagePreview) {
//   let previewUrl

//   listingImageInput.addEventListener('change', () => {
//     const [file] = listingImageInput.files
//     if (!file) return

//     if (previewUrl) URL.revokeObjectURL(previewUrl)
//     previewUrl = URL.createObjectURL(file)
//     listingImagePreview.src = previewUrl
//   })

//   window.addEventListener('beforeunload', () => {
//     if (previewUrl) URL.revokeObjectURL(previewUrl)
//   })
// }