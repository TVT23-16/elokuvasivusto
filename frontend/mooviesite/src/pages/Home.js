import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div>
      <h1>TOP 3 MOVIES </h1>
      <div id="content">
        <section id="main">
          <article>
            <div>
              <img src="1lehma.jpg" alt="Lehma" class="center"/>
              <h3>Lehmä 1</h3>
            </div>
          </article>
          <article>
            <div>
              <img src="2lehma.jpg" alt="Lehma" class="center"/>
              <h3>Lehmä 2</h3>
            </div>
          </article>
          <article>
            <div>
              <img src="3lehma.jpg" alt="Lehma" class="center"/>
              <h3>Lehmä 3</h3>
            </div>
          </article>

          <article>
            <div>
              <img src="2lehma.jpg" alt="Lehma" class="center"/>
              <h3>Lehmä 2</h3>
            </div>
          </article>
          <article>
            <div>
              <img src="2lehma.jpg" alt="Lehma" class="center"/>
              <h3>Lehmä 2</h3>
            </div>
          </article>          <article>
            <div>
              <img src="2lehma.jpg" alt="Lehma" class="center"/>
              <h3>Lehmä 2</h3>
            </div>
          </article>
        </section>
        </div>

            <div>
              <h2>Tähän jotain sisältöä</h2>
              <p>Liibalaba</p>
              <p>Liibalaba</p>
              <p>Liibalaba</p>
              <p>Liibalaba</p>
              <p>Liibalaba</p>
              <p>Liibalaba</p>
            </div>

            <div id="empty-space"></div>

      </div>
  );
}