const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('\n====================================');
  console.log('🌸 여자친구가 사이트에 접속했어!');
  console.log('====================================\n');

  socket.on('submit_answers', (data) => {
    console.clear();
    console.log('====================================');
    console.log('💌 실시간으로 받은 답변 목록:');
    console.log('====================================');
    
    data.answers.forEach((item, index) => {
      console.log(`\n[질문 ${index + 1}]: ${item.question}`);
      console.log(`👉 [답변]: ${item.answer}`);
    });
    
    console.log('\n====================================\n');
  });

  socket.on('disconnect', () => {
    console.log('🔒 여자친구가 페이지를 나갔어.');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 서버가 시작되었어: http://localhost:${PORT}`);
  console.log('터미널에서 실시간 답변 대기 중...\n');
});