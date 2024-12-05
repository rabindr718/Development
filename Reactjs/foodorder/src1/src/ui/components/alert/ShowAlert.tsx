import Swal from 'sweetalert2';

export const showAlert = async (
  title: string,
  text: string,
  confirmBtnText: string,
  cancelBtnText: string
): Promise<boolean> => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmBtnText ? confirmBtnText : 'Submit',
    cancelButtonText: cancelBtnText ? cancelBtnText : 'Cancel',
  });

  return result.isConfirmed;
};

export const successSwal = async (title: string, text: string) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
  });
  return result;
};

export const errorSwal = async (title: string, text: string) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    timer: 2000,
    showConfirmButton: false,
  });
  return result;
};
