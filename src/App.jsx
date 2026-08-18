import { useEffect, useMemo, useRef, useState } from 'react';
import tataSound from './assets/Tata.mp3';

const LOGIN_USERNAME = 'Admin';
const LOGIN_PASSWORD = '12345678';

const statCards = [
  { label: 'Overall', value: '101', tone: 'green' },
  { label: 'Power', value: '99', tone: 'gold' },
  { label: 'Defending', value: '100', tone: 'blue' },
];

const skills = [
  'จบสกอร์จากจังหวะสุดท้าย',
  'วางแผนเกมแบบทีมเวิร์ก',
  'ความอดทนและสติปัญญาในสนาม',
  'ความเร็วและความคล่องตัว',
  'ชูจิตวิญญาณนักฟุตบอล',
];

const traits = [
  'มีร่างกายแข็งแรงและทนทาน',
  'มีความกล้าหาญและไม่ย่อท้อ',
  'เป็นผู้นำที่ทำให้ทีมมั่นใจ',
  'มีความรู้สึกรับผิดชอบต่อเพื่อนร่วมทีม',
];

function App() {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('tata-logged-in') === 'true');
  const audioRef = useRef(null);

  const toggleCharacterAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  };

  const handlePortraitKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCharacterAudio();
    }
  };

  useEffect(() => {
    document.body.classList.toggle('profile-body', loggedIn);
  }, [loggedIn]);

  const heroText = useMemo(
    () =>
      'พี่เต วรการ คือ นักฟุตบอลผู้มีหัวใจนักสู้และภาวะผู้นำที่โดดเด่น เขาเป็นคนที่มาพร้อมความกล้า ความเร็ว และความเฉียบคมในทุกจังหวะเกม พร้อมทั้งสร้างความมั่นใจให้กับทีมและคนรอบข้างด้วยความซื่อสัตย์และความมุ่งมั่น',
    [],
  );

  const handleLogin = (event) => {
    event.preventDefault();

    if (username.trim() === LOGIN_USERNAME && password === LOGIN_PASSWORD) {
      localStorage.setItem('tata-logged-in', 'true');
      setLoggedIn(true);
      setError('');
      return;
    }

    setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  };

  const handleLogout = () => {
    localStorage.removeItem('tata-logged-in');
    setLoggedIn(false);
    setUsername('Admin');
    setPassword('12345678');
  };

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="background-glow glow-one" />
        <div className="background-glow glow-two" />

        <main className="login-shell">
          <section className="brand-panel">
            <div className="brand-badge">FOOTBALL LEGEND</div>
            <h1>พี่เต วรการ</h1>
            <p>
              นักฟุตบอลผู้มีความกล้าและความเป็นผู้นำที่เยี่ยมยอด พลังงานจากสนามและความมุ่งมั่น
              ทำให้เขาเป็นตัวแทนแห่งความทุ่มเทและจิตวิญญาณของทีมอย่างแท้จริง
            </p>
            <img
              src="/src/assets/Ta.png"
              alt="พี่เต วรการ"
              className="brand-portrait clickable-portrait"
              onClick={toggleCharacterAudio}
              onKeyDown={handlePortraitKeyDown}
              tabIndex={0}
              role="button"
              aria-label="เล่นหรือหยุดเสียงพี่เต"
            />
            <audio ref={audioRef} src={tataSound} preload="auto" />
          </section>

          <section className="login-panel">
            <div className="login-header">
              <span className="status-dot" />
              <span>ระบบยืนยันตัวตน</span>
            </div>

            <h2>เข้าสู่ระบบ</h2>

            <form className="login-form" onSubmit={handleLogin}>
              <label htmlFor="username">ชื่อผู้ใช้</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />

              <label htmlFor="password">รหัสผ่าน</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <button type="submit">เข้าสู่ระบบ</button>
            </form>

            <p className="hint">ผู้ใช้: Admin • รหัสผ่าน: 12345678</p>
            {error && <p className="error-message">{error}</p>}
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="topbar">
        <div className="brand-title">พี่เต วรการ</div>
        <button type="button" className="logout-btn" onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </header>

      <main className="profile-container">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="eyebrow">CHARACTER INTRODUCTION</span>
            <h2>พี่เต วรการ</h2>
            <p>{heroText}</p>
            <div className="stats-grid">
              {statCards.map((item) => (
                <div key={item.label} className={`stat-box ${item.tone}`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-card">
              <img
                src="/src/assets/Ta.png"
                alt="พี่เต วรการ"
                className="clickable-portrait"
                onClick={toggleCharacterAudio}
                onKeyDown={handlePortraitKeyDown}
                tabIndex={0}
                role="button"
                aria-label="เล่นหรือหยุดเสียงพี่เต"
              />
              <audio ref={audioRef} src={tataSound} preload="auto" />
            </div>
          </div>
        </section>

        <section className="content-grid">
          <article className="info-card">
            <h3>ประวัติความเป็นมา</h3>
            <p>
              พี่เต วรการ เกิดและเติบโตในครอบครัวที่ให้ความสำคัญกับความรู้ ความซื่อสัตย์
              และความกตัญญู เขาเป็นบุคคลที่มีความหลงใหลในการพัฒนาและการเป็นผู้นำที่ยั่งยืน
              โดยเริ่มต้นจากการเรียนรู้สิ่งต่าง ๆ อย่างเข้มข้นและมุ่งมั่นต่อเป้าหมายของตัวเอง
              จนกลายเป็นคนที่ได้รับความเคารพจากคนรอบข้าง
            </p>
            <p>
              ด้วยความสามารถในการรับมือกับสถานการณ์ที่ท้าทาย เขาจึงประสบความสำเร็จในหลายด้าน
              ไม่ว่าจะเป็นการบริหารจัดการ การสื่อสาร และการสร้างแรงบันดาลใจให้กับคนอื่น
              จนมีชื่อเสียงในฐานะผู้มีความเชี่ยวชาญและความเป็นผู้นำอันทรงพลัง
            </p>
          </article>

          <article className="info-card">
            <h3>ลักษณะเด่น</h3>
            <ul>
              {traits.map((trait) => (
                <li key={trait}>{trait}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="skills-card">
          <h3>ความสามารถและทักษะ</h3>
          <div className="skill-pills">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
