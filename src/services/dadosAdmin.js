import api from './api'

export function getDadosAdmin() {
  return api
    .get('dadosadministrativo/listardados')
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function postDadosAdmin(formData) {
  // const formData = new FormData();

  // formData.append('txtCliente', dados.txtCliente);
  // formData.append('CpfCnpj', dados.CpfCnpj);
  // formData.append('txtEndereco', dados.txtEndereco);
  // formData.append('txtEmail', dados.txtEmail);
  // formData.append('txtNumTelefone', dados.txtNumTelefone);
  // formData.append('imgLogo', dados.imgLogo);
  // formData.append('txtNumEndereco', dados.txtNumEndereco);
  // formData.append('txtCidade', dados.txtCidade);
  // formData.append('txtEstado', dados.txtEstado);
  // formData.append('txtCep', dados.txtCep);
  // formData.append('txtFacebook', dados.txtFacebook);
  // formData.append('txtInstagram', dados.txtInstagram);
  // formData.append('txtX', dados.txtX);

  return api
    .post('dadosadministrativo/gravardados', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log('error:', error)
      throw error
    })
}
