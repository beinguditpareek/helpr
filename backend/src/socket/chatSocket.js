export const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join private chat room
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
      console.log("User joined room:", roomId);
    });

    // Send message
    socket.on("sendMessage", (data) => {
      const { roomId, message } = data;

      // Broadcast to room
      io.to(roomId).emit("receiveMessage", {
        message,
        sender: data.sender,
        receiver: data.receiver,
        createdAt: new Date(),
      });
    });

    // Typing indicator
    socket.on("typing", ({ roomId, user }) => {
      socket.to(roomId).emit("typing", user);
    });

    socket.on("stopTyping", ({ roomId, user }) => {
      socket.to(roomId).emit("stopTyping", user);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
