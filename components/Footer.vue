<template>
  <div>
    <b-footer className="footer">
      <b-container>
        <b-row>
          <b-col cols="12" md="4">
            <h5>About Us</h5>
            <p>Description of the bookstore, history, mission, etc.</p>
          </b-col>
          <b-col cols="12" md="4">
            <h5>Quick Links</h5>
            <b-list-group flush>
              <b-list-group-item href="#">Home</b-list-group-item>
              <b-list-group-item href="#">Shop</b-list-group-item>
              <b-list-group-item href="#">Contact</b-list-group-item>
              <b-list-group-item href="#">FAQ</b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col cols="12" md="4">
            <h5>Contact Us</h5>
            <p>123 Book Street<br>Readville, BK 12345<br>Email: contact@bookstore.com<br>Phone: +123 456 7890</p>
            <div className="social-icons">
              <b-icon icon="facebook" className="social-icon"></b-icon>
              <b-icon icon="twitter" className="social-icon"></b-icon>
              <b-icon icon="instagram" className="social-icon"></b-icon>
              <!-- Add more social icons if needed -->
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-center py-3">
              © 2023 Bookstore. All rights reserved.
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  // If you have custom icons or components, import them here
};
</script>

<style scoped>
.footer {
  background-color: #343a40;
  color: white;
}

.footer h5 {
  color: #fff;
}

.footer p {
  color: rgba(255, 255, 255, 0.5);
}

.social-icons .social-icon {
  margin-right: 0.5rem;
  color: white;
  cursor: pointer;
  /* Style your icons here */
}

.social-icons {
  margin-top: 1rem;
}

/* Add responsive or additional styles as needed */
</style>
