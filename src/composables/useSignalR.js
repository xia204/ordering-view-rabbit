import { ref, onMounted, onUnmounted } from 'vue'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const serverBase = 'http://localhost:5091'
const hubPath = '/orderHub'

// GLOBAL => compartido por toda la app
const connection = ref(null)
const messages = ref([])
const isConnected = ref(false)
const connectionError = ref(null)
let initialized = false

export function useSignalRConnection() {
  async function startConnection() {
    if (initialized) return      // 👈 evitar reconexiones múltiples
    initialized = true

    const conn = new HubConnectionBuilder()
      .withUrl(serverBase + hubPath)
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build()

    conn.on('ReceiveMessage', (msg) => {
      console.log("Mensaje recibido SR:", msg)

      // Parsear si viene en JSON
      let data = msg
      try { data = JSON.parse(msg) } catch {}

      messages.value.unshift({
        id: Date.now(),
        title: `Orden de ${data.FirstName} ${data.LastName}`,
        preview: `Pedido por $${data.TotalPrice}`,
        sender: data.UserName,
        date: new Date().toISOString(),
        fullContent: JSON.stringify(data, null, 2),
        orderDetails: data
      })
    })

    try {
      await conn.start()
      connection.value = conn
      isConnected.value = true
      console.log("SignalR conectado:", serverBase + hubPath)
    } catch (err) {
      connectionError.value = err
      console.error("SignalR error:", err)
    }
  }

  onMounted(startConnection)

  onUnmounted(() => {
    /* No hacemos stop aquí, la app debe mantener la conexión global */
  })

  return {
    messages,
    connection,
    isConnected,
    connectionError
  }
}
