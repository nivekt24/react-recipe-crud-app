import PageNav from '../components/PageNav';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutWrapper}>
      <PageNav />
      <main className={styles.about}>
        <section>
          <div className={styles.imageWrapper}>
            <img className={styles.img} src="food-plate.png" alt="recipes" />
          </div>
          <div>
            <h2>About MyRecipePlate.</h2>
            <p>
              A recipe blog serves as a community hub for food bloggers
              worldwide to share recipes and cultural dishes, fostering
              connections and friendships. Users engage in collaborative
              interactions, exchanging culinary tips and exploring diverse
              recipes.
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
    </div>
  );
};

export default About;
