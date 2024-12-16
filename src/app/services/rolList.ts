export const rolList = async () => {
    try {
      const response = await fetch(`https://ibillboard.com/api/positions`, {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error(`Error en la autenticación: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.positions || [];

    } catch (error) {
      console.error('Error en la solicitud:', error);
      return [];
    }
  };