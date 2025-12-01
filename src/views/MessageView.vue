<template>
  <v-container class="py-16">
    <v-row>
      <v-col cols="12">
        <message-component v-for="message in messages" :key="message.id" :message="message.orderDetails" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import MessageComponent from '@/components/MessageComponent.vue';
import { useSignalRConnection } from '@/composables/useSignalR'

const { messages } = useSignalRConnection()
</script>
