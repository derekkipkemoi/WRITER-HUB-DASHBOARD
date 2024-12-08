'use client';

import axios from 'axios';
import { OrderObjectType, OrderTemplateType } from '@/types/order';



export interface CreateOrder {
  package: string,
  status: string,
}



class OrderClient {
  async createOrder(newOrder: CreateOrder): Promise<{ data?: null; error?: string; message?: String }> {
    const userId = localStorage.getItem('id');  // Get user ID from localStorage
    if (!userId) {
      return { error: 'User ID not found in local storage' };
    }
    try {
      // Make API request with the dynamic user ID
      const response = await axios.post(`http://localhost:3010/users/${userId}/orders/createOrder`, newOrder, {
        headers: {
          'Content-Type': 'application/json' // Set appropriate content type for JSON data
        }
      });

      console.log(response)


      if (response.data.message === "Order created successfully") {
        const { id } = response.data.order
        localStorage.setItem('orderId', id)
        return { message: response.data.message }
      }


      // Optional: Handle specific response messages if needed
      if (response.data.message !== "Order created successfully") {
        return { error: 'Failed to upload avatar' };
      }

      return { data: null }; // Return added data or any additional info if needed
    } catch (error) {
      console.error("Error creating otder:", error);
      return { error: 'An error occurred while creating order' };
    }
  }

  async saveAddedTemplate(orderId: string, templateData: OrderTemplateType): Promise<{ data?: null; error?: string; message?: string }> {
    const userId = localStorage.getItem('id');  // Get user ID from localStorage
    if (!userId) {
      return { error: 'User ID not found in local storage' };
    }
    try {
      // Make API request to update resume for a specific order
      const response = await axios.post(`http://localhost:3010/users/${userId}/orders/${orderId}/saveOrderTemplate`, templateData, {
        headers: {
          'Content-Type': 'application/json' // Set appropriate content type for JSON data
        }
      });

      // Check if the response indicates success
      if (response.data.message === "Order template saved successfully") {
        const { id } = response.data.order;
        console.log("Template", response.data.order.template)
        localStorage.setItem('orderId', id); // Optionally store the updated order ID in localStorage
        return { data: response.data.order.template, message: response.data.message }; // Return the updated order data
      }

      // Handle failure case
      if (response.data.message !== "Order template saved successfully") {
        return { error: 'Failed to save template' };
      }

      return { data: null }; // Return null if there's no additional data
    } catch (error) {
      console.error("Error updating resume file:", error);
      return { error: 'An error occurred while updating the resume file' };
    }
  }

  async updateResumeFile(orderId: string, updatedResume: FormData): Promise<{ data?: null; error?: string; message?: string }> {
    const userId = localStorage.getItem('id');  // Get user ID from localStorage
    if (!userId) {
      return { error: 'User ID not found in local storage' };
    }
    try {
      // Make API request to update resume for a specific order
      const response = await axios.post(`http://localhost:3010/users/${userId}/orders/${orderId}/updateResumeFile`, updatedResume, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set appropriate content type for file uploads
        }
      });

      // Check if the response indicates success
      if (response.data.message === "Resume updated successfully") {
        const { id } = response.data.order;
        localStorage.setItem('orderId', id); // Optionally store the updated order ID in localStorage
        return { data: response.data.order }; // Return the updated order data
      }

      // Handle failure case
      if (response.data.message !== "Resume updated successfully") {
        return { error: 'Failed to update resume file' };
      }

      return { data: null }; // Return null if there's no additional data
    } catch (error) {
      console.error("Error updating resume file:", error);
      return { error: 'An error occurred while updating the resume file' };
    }
  }

  async updateOrderExtraService(orderId: string, updatedServiceDetails: FormData): Promise<{ data?: null; error?: string; message?: string }> {
    const userId = localStorage.getItem('id');  // Get user ID from localStorage
    if (!userId) {
      return { error: 'User ID not found in local storage' };
    }

    try {
      // Make API request to update extra services for a specific order
      const response = await axios.post(`http://localhost:3010/users/${userId}/orders/${orderId}/updateExtraServices`, updatedServiceDetails, {
        headers: {
          'Content-Type': 'application/json' // Set appropriate content type for JSON data
        }
      });

      // Check if the response indicates success
      if (response.data.message === "Order updated successfully") {
        const { id } = response.data.order;
        localStorage.setItem('orderId', id); // Optionally store the updated order ID in localStorage
        return { data: response.data.order, message: 'Order updated successfully' }; // Return the updated order data and success message
      }

      // Handle failure case
      if (response.data.message !== "Order updated successfully") {
        return { error: 'Failed to update order extra services', message: response.data.message };
      }

      return { data: null }; // Return null if there's no additional data
    } catch (error) {
      console.error("Error updating order extra services:", error);
      return { error: 'An error occurred while updating the order extra services' };
    }
  }

  async getOrder(orderId: string): Promise<{ data?: OrderObjectType | null; error?: string }> {
    try {
      const userId = localStorage.getItem('id');  // Get user ID from localStorage
      if (!userId) {
        return { error: 'User ID not found in local storage' };
      }
      const response = await axios.get(`http://localhost:3010/users/${userId}/orders/${orderId}/getOrder`, {
        headers: {
          'Content-Type': 'application/json' // Set appropriate content type for JSON data
        }
      });

      if (response.data) {
        return { data: response.data.order };  // Return the order
      }

      return { error: 'Order not found' };
    } catch (error) {
      console.error("Error fetching order:", error);
      return { error: 'An error occurred while fetching the order' };
    }
  }

  async getUserOrders(): Promise<{ data?: OrderObjectType[] | null; error?: string }> {
    try {
      const userId = localStorage.getItem('id');  // Get user ID from localStorage
      if (!userId) {
        return { error: 'User ID not found in local storage' };
      }

      const response = await axios.get(`http://localhost:3010/users/${userId}/orders/getUserOrders`);

      if (response.data && response.data.orders) {
        console.error("fetching order:", response.data.orders);
        // Ensure that `response.data.order` is always an array
        // const orderArray: OrderObjectType[] = Array.isArray(response.data.order) 
        //   ? response.data.order 
        //   : [response.data.order]; // Wrap in an array if it's a single order
        return { data: response.data.orders };
      }

      return { error: 'Order not found' };
    } catch (error) {
      console.error("Error fetching order:", error);
      return { error: 'An error occurred while fetching the order' };
    }
  }

  async deleteOrder(orderId: string): Promise<{ error?: string, message?: string }> {
    try {
      console.log(orderId)
      const response = await axios.post(`http://localhost:3010/users/orders/${orderId}/deleteOrder`);
      if (response.data.message === "Order deleted successfully") {
        return { message: response.data.message };  // Return the order
      }
      return { error: 'Order not found' };
    } catch (error) {
      console.error("Error fetching order:", error);
      return { error: 'An error occurred while fetching the order' };
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<{ error?: string, message?: string }> {
    try {
      console.log(orderId);
      // Pass the status in the body of the POST request
      const response = await axios.post(`http://localhost:3010/users/orders/${orderId}/updateOrderStatus`, {
        status: status
      });

      if (response.data.message === "Order status updated successfully") {
        return { message: response.data.message };  // Return the success message
      }

      if (response.data.message === "Your order has no more revision requests") {
        return { message: response.data.message };  // Return the success message
      }

      return { error: 'Order not found' };
    } catch (error) {
      console.error("Error updating order status:", error);
      return { error: 'An error occurred while updating the order status' };
    }
  }

  async uploadedCompletedFile(orderId: string, completed: FormData): Promise<{ data?: null; error?: string; message?: string }> {
    const userId = localStorage.getItem('id');  // Get user ID from localStorage
    if (!userId) {
      return { error: 'User ID not found in local storage' };
    }
    try {
      // Make API request to update resume for a specific order
      const response = await axios.post(`http://localhost:3010/users/orders/${orderId}/completed`, completed, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set appropriate content type for file uploads
        }
      });

      // Check if the response indicates success
      if (response.data.message === "Order completed file uploaded successfully") {
        return { message: response.data.message }; // Return the updated order data
      }

      // Handle failure case
      if (response.data.message !== "Order completed file uploaded successfully") {
        return { error: 'Failed upload file' };
      }

      return { data: null }; // Return null if there's no additional data
    } catch (error) {
      console.error("Error updating resume file:", error);
      return { error: 'An error occurred while updating the resume file' };
    }
  }

  async downloadCompletedFile(orderId: string, completedFile: string): Promise<{ fileUrl?: null; error?: string; message?: string }> {
    const userId = localStorage.getItem('id');  // Get user ID from localStorage
    if (!userId) {
      return { error: 'User ID not found in local storage' };
    }
    try {
      // Make API request to update resume for a specific order
      const response = await axios.post(`http://localhost:3010/users/orders/${orderId}/downloadFile`, {
        fileName: completedFile
      });

      // Check if the response indicates success
      if (response.data.message === "File Downloaded Successfully") {
        return { fileUrl: response.data.fileUrl }; // Return the updated order data
      }

      // Handle failure case
      if (response.data.message !== "Resume updated successfully") {
        return { error: 'Failed to update resume file' };
      }

      return { fileUrl: null }; // Return null if there's no additional data
    } catch (error) {
      console.error("Error updating resume file:", error);
      return { error: 'An error occurred while updating the resume file' };
    }
  }

}

export const orderClient = new OrderClient