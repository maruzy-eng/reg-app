import styles from "@/components/onboarding-checkmate/onboarding-checkmate-chat.module.css";

export default function Loading() {
  return (
    <main className={styles.pageShell}>
      <header className={`${styles.topBar} ${styles.skeletonBlock}`}>
        <div className={styles.brandCluster}>
          <div className={styles.skeletonLogo} />
          <div>
            <div className={styles.skeletonLineWide} />
            <div className={styles.skeletonLineShort} />
          </div>
        </div>
        <div className={styles.skeletonPill} />
      </header>

      <section className={styles.appFrame} aria-label="Carregando conversa">
        <aside className={`${styles.sidebar} ${styles.skeletonBlock}`}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonLineWide} />
          <div className={styles.skeletonLineMedium} />
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonCard} />
        </aside>

        <div className={`${styles.chatPanel} ${styles.skeletonBlock}`}>
          <div className={styles.chatHeader}>
            <div className={styles.brandCluster}>
              <div className={styles.skeletonAvatarSmall} />
              <div>
                <div className={styles.skeletonLineMedium} />
                <div className={styles.skeletonLineShort} />
              </div>
            </div>
          </div>
          <div className={styles.messages}>
            <div className={styles.skeletonMessageLeft} />
            <div className={styles.skeletonMessageLeftSmall} />
            <div className={styles.skeletonMessageRight} />
          </div>
          <div className={styles.composer}>
            <div className={styles.skeletonComposerButton} />
            <div className={styles.skeletonInput} />
            <div className={styles.skeletonComposerButton} />
          </div>
        </div>
      </section>
    </main>
  );
}
