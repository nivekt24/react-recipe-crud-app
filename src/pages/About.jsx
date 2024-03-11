import PageNav from '../components/PageNav';
import styles from './About.module.css';

const About = () => {
  return (
    <main className={styles.about}>
      <PageNav />

      <section>
        <img src="" alt="" />
        <div>
          <h2>About MyRecipePlate.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            dicta illum vero culpa cum quaerat architecto sapiente eius non
            soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
            perspiciatis?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            doloribus libero sunt expedita ratione iusto, magni, id sapiente
            sequi officiis et.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
