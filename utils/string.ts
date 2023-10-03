/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Converts a potentially unsafe string to a string that can be safely printed
 * on a terminal.
 *
 * This removes all Unicode control characters, which could be used (among
 * other things) to inject ANSI control sequences to alter arbitrary contents
 * on the user's terminal.
 */
const sanitizeString = (s: string): string => {
  return s.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim()
}

export const StringUtils = { sanitizeString }
