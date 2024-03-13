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
            A recipe blog serves as a community hub for food bloggers worldwide
            to share recipes and cultural dishes, fostering connections and
            friendships. Users engage in collaborative interactions, exchanging
            culinary tips and exploring diverse recipes.
          </p>
          <p>
            The platform prioritizes inclusivity, offering recipes for various
            dietary preferences, while also promoting social impact through
            initiatives supporting sustainability and community engagement.
            Continuously evolving, the blog remains dedicated to inspiring,
            educating, and connecting food enthusiasts globally.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
