import axiosInstance from "./axiosInstance";

export const sendGetRequest = async (URL: string) => {
  const res = await axiosInstance.get(URL);
  return res;
};

export const sendPostRequest = async (URL: string, params: any) => {
  const res = await axiosInstance.post(URL, params);
  return res;
};

export const sendGetDownloadRequest = async (URL: string, params: any) => {
  const res = await axiosInstance.get(URL, {
    responseType: "blob",
  });
  return res;
};

export const sendPostDownloadRequest = async (URL: string, params: any) => {
  const res = await axiosInstance.post(URL, params, {
    responseType: "blob",
  });
  return res;
};

export const sendPostMultipartRequest = async (URL: string, params: any) => {
  const formData = new FormData();

  Object.keys(params).forEach((fieldName) => {
    if (Array.isArray(params[fieldName])) {
      console.log("customer array");
      params[fieldName].map((a) => {
        formData.append(fieldName, a);
      });
      return;
    }
    formData.append(fieldName, params[fieldName]);
  });

  const res = await axiosInstance.post(URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const sendPostMultipartRequestv2 = async (URL: string, params: any) => {
  const getFormData = (object: any) =>
    Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      console.log(formData);
      return formData;
    }, new FormData());

  const res = await axiosInstance.post(URL, getFormData(params), {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const sendPatchRequest = async (URL: string, params: any) => {
  const res = await axiosInstance.patch(URL, params);
  return res;
};

export const sendPutRequest = async (URL: string, params: any) => {
  const res = await axiosInstance.put(URL, params);
  return res;
};

export const sendDeleteRequest = async (URL: string) => {
  const res = await axiosInstance.delete(URL);
  return res;
};

// export const generateErrorMessage = (error) => {
//   const message = error.response.data.message;
//   let detail;

//   if (error.response.data.errors?.length > 0) {
//     const errors = error.response.data.errors;

//     if (typeof errors === "object") {
//       detail = [];
//       Object.keys(errors).forEach((key) => {
//         errors[key].forEach((err) => detail.push(`${err}`));
//       });

//       detail = detail.join(", ");
//     } else if (typeof errors === "string") {
//       detail = errors;
//     }
//   } else {
//     detail = message;
//   }

//   return `${detail ?? "Unexpected error happened"}`;
// };
