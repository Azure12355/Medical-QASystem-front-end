<template>
  <div class="chat-container" id="kgqa-container">
    <ul class="messages">
      <li
        class="message-wrapper mine-wrapper"
        v-for="message in messages"
        :key="message.content"
        :class="{
          'mine-wrapper': message.mine,
          'yours-wrapper': !message.mine,
        }"
      >
        <div :class="{ mine: message.mine, yours: !message.mine }">
          <div class="message-content">
            <p>{{ message.content }}</p>
          </div>
        </div>
        <div class="message-header">
          <img
            :src="require(`@/assets/${message.avatar}`)"
            alt="avatar"
            class="avatar"
          />
          <span class="username">{{ message.name }}</span>
        </div>
      </li>
    </ul>

    <div class="input-area">
      <el-button type="primary" icon="el-icon-microphone" circle></el-button>
      <el-button
        type="primary"
        icon="el-icon-picture-outline"
        circle
      ></el-button>
      <el-button type="primary" icon="el-icon-upload" circle></el-button>
      <input
        type="text"
        v-model="newMessage"
        placeholder="请输入您要搜寻的医疗相关问题..."
        @keyup.enter="sendMessage"
      />
      <el-button type="primary" @click="sendMessage" style="font-size: 18px; border-radius: 15px;">发送</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [
        {
          content: "您好,我是基于知识图谱构建的智能问答机器人, 您可以询问我相关问题,问题答案来源于已构建的知识图谱模型...",
          mine: false,
          name: "医疗问答",
          avatar: "医药问答.webp",
        },
        {
          content: "板蓝根颗粒能治啥病",
          mine: true,
          name: "用户",
          avatar: "用户.webp",
        },
        {
          content: "板蓝根颗粒主治的疾病有流行性腮腺炎；喉痹；喉炎；咽部异感症；急性单纯性咽炎；腮腺隙感染；过敏性咽炎；咽囊炎；急性鼻咽炎；喉水肿；慢性化脓性腮腺炎；慢性咽炎；急性喉炎；咽异感症；鼻咽炎；锁喉痈；小儿咽喉炎；喉返神经损伤；化脓性腮腺炎；喉血管瘤,可以试试",
          mine: false,
          name: "医疗问答",
          avatar: "医药问答.webp",
        },
      ],
      newMessage: "",
    };
  },

  methods: {
    sendMessage() {
      const messageContent = this.newMessage;
      this.messages.push({
        content: messageContent,
        mine: true,
        name: "用户",
        avatar: "用户.webp",
      });
      this.newMessage = ""; // 清空输入框

      this.scrollToBottom();

      // 添加等待中的消息
      const waitingMessageIndex =
        this.messages.push({
          content: "等待中...",
          mine: false,
          name: "医疗问答",
          avatar: "医药问答.webp",
        }) - 1; // 记录等待消息的索引，方便后面替换
        
        axios
          .post("/api/KGQA_chatbot", { message: messageContent })
          .then((response) => {
            const reply = response.data.message; // 根据你的响应结构来
            // 替换等待中的消息
            this.$set(this.messages, waitingMessageIndex, {
              content: reply,
              mine: false,
              name: "医疗问答",
              avatar: "医药问答.webp",
            });
          })
          .catch((error) => {
            console.error("There was an error!", error);
            // 替换为响应失败消息
            this.$set(this.messages, waitingMessageIndex, {
              content: "响应失败",
              mine: false,
              name: "医疗问答",
              avatar: "医药问答.webp",
            });
          })
          .finally(() => {
            this.scrollToBottom(); // 确保滚动到最新的消息
          });
    },

    //滚动到最底部
    scrollToBottom() {
      this.$nextTick(() => {
        const element = this.$el.querySelector(".messages");
        element.scrollTop = element.scrollHeight;
      });
    },

  },
};
</script>

<style>
.messages li {
  margin-right: 20px;
}
.chat-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85vh;
  border: 3px solid #c2dbed;
  border-radius: 10px;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between; /* 将消息区域和输入区域分开 */
}

#kgqa-container {
  background-image: url("~@/assets/病例巡诊.png");
  background-size: 500px 300px;
  background-repeat: no-repeat;
  background-position: left 280px;
}

.messages {
  list-style-type: none;
  overflow-y: auto; /* 如果消息过多，允许滚动 */
  flex-grow: 1; /* 让消息区域占据大部分空间 */
  margin: 0;
  padding: 0;

}

.messages .message-wrapper {
  margin: 44px 20px;
  display: flex;
}

.mine-wrapper {
  justify-content: flex-end;
}

.mine,
.yours {
  display: inline-block;
  max-width: 50%; /* 限制最大宽度为聊天窗口的一半 */
  word-wrap: break-word;
  border-radius: 20px;
  padding: 0px 15px;
  color: white;
  height: min-content;
  height: 0px;
}

.mine {
  background-color: #22c55e;
}

.yours {
  background-color: #262626;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 8px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}

input[type="text"] {
  width: calc(100% - 20px);
  height: 40px;
  margin-top: auto;
  padding: 0 10px;
  border: 2px solid #409eff;
  border-radius: 10px;
}
.input-area {
  display: flex;
  align-items: center;
  gap: 10px; /* 为按钮和输入框之间添加间隔 */
  flex-shrink: 0; /* 防止输入区域被压缩 */
}

.icon-button,
.send-button {
  background-color: #f0f0f0; /* 按钮背景颜色 */
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%; /* 圆形按钮 */
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.mine .message-content,
.yours .message-content {
  border-radius: 20px; /* 保持圆角 */
  display: inline-block; /* 保证背景紧贴内容 */
  word-wrap: break-word; /* 确保长单词也能被正确折行 */
  padding: 4px 0; /* 增加垂直内边距，但不影响水平内边距 */
}

/* 保持用户名和头像外的背景颜色 */
.mine .message-content {
  background-color: #489f72;
}

.yours .message-content {
  background-color: #0071c1;
}

.mine .message-header,
.yours .message-header {
  order: -1; /* 确保头像和用户名显示在消息之上 */
}

.message-content p {
  font-size: 18px;
  line-height: 28px; /* 行高略大于字体大小，确保背景紧密包裹文字 */
  padding: 10px 15px; /* 适当的内边距，确保文字不会贴着背景边缘 */
  margin: 0; /* 移除默认的段落间距 */
  text-align: left;
}

.upload-display-area {
  margin-bottom: 10px;
}

.upload-display-area ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.upload-display-area li {
  background-color: #f3f4f6;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}
</style>
