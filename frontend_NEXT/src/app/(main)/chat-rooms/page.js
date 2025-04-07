import styles from './page.module.css';

export default function ChatRoomsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat Rooms</h1>
      <p className={styles.description}>Join a chat room and collaborate in real-time!</p>
    </div>
  );
}
