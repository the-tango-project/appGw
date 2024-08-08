package org.apeiron.gateway.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.apeiron.gateway.IntegrationTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@IntegrationTest
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
