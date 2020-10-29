<template>
  <!-- ログイン済 -->
  <nav class="navbar is-light topNav" v-if="state.logined">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/books">
          <figure>
            <img alt="Opacsan logo" width="123" src="../../assets/logo.png" />
          </figure>
        </router-link>
      </div>
      <div class="navbar-start is-size-4">
        <router-link to="/books" class="navbar-item">
          <span>{{ $t(`label.book`) }}</span>
        </router-link>
        <router-link to="/users" class="navbar-item">
          <span>{{ $t(`label.users`) }}</span>
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <span class="icon">
              <fa icon="user" />
            </span>
            <span> {{ state.userName }} さん</span>
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              <span class="icon">
                <fa icon="check" />
              </span>
              <span>{{ state.libraryName }}</span>
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="logout()">
              <span>{{ $t(`label.logout`) }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- ログイン未 -->
  <nav class="navbar is-light" v-else>
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/">
          <figure>
            <img alt="Opacsan logo" width="123" src="../../assets/logo.png" />
          </figure>
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <div class="control">
              <router-link to="/signup">
                <button-atoms :isNarrow="true" type="primary">
                  <strong>{{ $t(`label.signup`) }}</strong>
                </button-atoms>
              </router-link>
            </div>
            <div class="control">
              <router-link to="/login">
                <button-atoms :isNarrow="true" type="primary">
                  <strong>{{ $t(`label.login`) }}</strong>
                </button-atoms>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

export default defineComponent({
  setup(): object {
    const authStore = useAuthStore()
    const logout = (): void => {
      authStore.delete().finally(() => router.push('/login'))
    }

    const state = reactive({
      logined: computed(() => {
        return authStore.token ? true : false
      }),
      libraryName: computed(() => authStore.libraryName),
      userName: computed(() => authStore.userName),
    })

    return {
      authStore,
      logout,
      state,
    }
  },
})
</script>
